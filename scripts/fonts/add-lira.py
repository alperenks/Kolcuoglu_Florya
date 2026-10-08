# Adds a ₺ (U+20BA) to public/fonts/playfair*-tr.woff2. Playfair Display has no ₺; the newer Playfair
# family by the same designer does. Its ₺ is taken at the optical size and width that match Playfair
# Display's stems and hairlines (opsz 48 / italic 40, wdth 87.5), at the Playfair weight whose H stem
# equals Playfair Display's at 400…900, and stored with gvar + HVAR variations on Display's weight axis.
#
# usage: python3 add-lira.py <display latin.woff2> <playfair latin.woff2> <playfair latin-ext.woff2> \
#                            <playfair*-tr.woff2 without ₺> <out.woff2> <opsz>
# Display latin files: .next/static/media (next/font). Playfair files: fonts.googleapis.com/css2?family=
# Playfair:ital,opsz,wdth,wght@0,5..1200,87.5..112.5,300..900;1,5..1200,87.5..112.5,300..900
# Needs fonttools + brotli (pip install fonttools brotli).
import os, sys, copy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from measure import m
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib import instancer, builder
from fontTools.varLib.models import VariationModel
from fontTools.ttLib.tables.TupleVariation import TupleVariation

pd_latin, p2_latin, p2_ext, target, out, opsz = sys.argv[1:7]
opsz = float(opsz); WDTH = 87.5; NAME = 'uni20BA'
PD_WEIGHTS = [400, 500, 600, 700, 800, 900]

# 1. Playfair 2 weight whose H stem matches Playfair Display at each weight (stem grows with weight: bisect)
pd = TTFont(pd_latin); p2l = TTFont(p2_latin)
wmap = {}
for w in PD_WEIGHTS:
    goal = m(pd, {'wght': w})['stem']; lo, hi = 300.0, 900.0
    if m(p2l, {'opsz': opsz, 'wdth': WDTH, 'wght': lo})['stem'] >= goal: wmap[w] = lo; continue
    for _ in range(30):
        mid = (lo + hi) / 2
        if m(p2l, {'opsz': opsz, 'wdth': WDTH, 'wght': mid})['stem'] < goal: lo = mid
        else: hi = mid
    wmap[w] = round((lo + hi) / 2, 2)
print('weight map PD->P2', wmap)

# 2. Static ₺ outlines from Playfair 2 at those locations (layout dropped, so no bracket alternates)
src = TTFont(p2_ext)
opts = subset.Options(); opts.layout_features = []; opts.notdef_outline = True
ss = subset.Subsetter(opts); ss.populate(unicodes=[0x20BA]); ss.subset(src)
masters = {}
for w in PD_WEIGHTS:
    inst = instancer.instantiateVariableFont(copy.deepcopy(src), {'opsz': opsz, 'wdth': WDTH, 'wght': wmap[w]})
    g = inst['glyf'][NAME]; g.expand(inst['glyf'])
    masters[w] = (g, list(g.coordinates), inst['hmtx'][NAME])
base_g, base_coords, (base_adv, base_lsb) = masters[400]
for w in PD_WEIGHTS: assert len(masters[w][1]) == len(base_coords)

# 3. Add the glyph to the Playfair Display TR subset
t = TTFont(target); t.ensureDecompiled()
assert NAME not in t.getGlyphOrder()
order = t.getGlyphOrder() + [NAME]; t.setGlyphOrder(order)
t['glyf'][NAME] = copy.deepcopy(base_g)
t['hmtx'][NAME] = (base_adv, base_lsb)
for st in t['cmap'].tables:
    if st.isUnicode(): st.cmap[0x20BA] = NAME
gdef = t['GDEF'].table
if gdef.GlyphClassDef: gdef.GlyphClassDef.classDefs[NAME] = 1

# 4. Variations: masters at Playfair Display's normalized weight (no avar: (w-400)/500)
locs = [{} if w == 400 else {'wght': (w - 400) / 500} for w in PD_WEIGHTS]
model = VariationModel(locs, axisOrder=['wght'])
n = len(base_coords)
pt_deltas = [[None] * (n + 4) for _ in model.supports]
for i in range(n):
    for axis in (0, 1):
        d = model.getDeltas([masters[w][1][i][axis] for w in PD_WEIGHTS])
        for k, v in enumerate(d):
            if pt_deltas[k][i] is None: pt_deltas[k][i] = [0, 0]
            pt_deltas[k][i][axis] = v
adv_d = model.getDeltas([masters[w][2][0] for w in PD_WEIGHTS])
tvs = []
for k in range(1, len(model.supports)):
    coords = [(round(x), round(y)) for x, y in pt_deltas[k][:n]] + [(0, 0), (round(adv_d[k]), 0), (0, 0), (0, 0)]
    tvs.append(TupleVariation(model.supports[k], coords))
t['gvar'].variations[NAME] = tvs

# 5. HVAR: new regions + one VarData row for the advance width
hvar = t['HVAR'].table; vs = hvar.VarStore
ridx = []
for sup in model.supports[1:]:
    vs.VarRegionList.Region.append(builder.buildVarRegion(sup, ['wght'])); ridx.append(len(vs.VarRegionList.Region) - 1)
vs.VarRegionList.RegionCount = len(vs.VarRegionList.Region)
vs.VarData.append(builder.buildVarData(ridx, [[round(v) for v in adv_d[1:]]], optimize=False)); vs.VarDataCount = len(vs.VarData)
hvar.AdvWidthMap.mapping[NAME] = ((len(vs.VarData) - 1) << 16) | 0

t.flavor = 'woff2'; t.save(out)

# 6. Verify: ₺ outline/advance at each master equals the Playfair 2 instance; old glyphs unchanged
from fontTools.pens.recordingPen import DecomposingRecordingPen
new = TTFont(out); old = TTFont(target)
for w in PD_WEIGHTS:
    adv = new.getGlyphSet(location={'wght': w})[NAME].width
    assert round(adv) == masters[w][2][0], (w, adv)
    print('PD %d: ₺ advance %d (P2 instance %d)' % (w, round(adv), masters[w][2][0]))
for w in (400, 650, 900):
    go = old.getGlyphSet(location={'wght': w}); gn = new.getGlyphSet(location={'wght': w})
    for cp, name in old.getBestCmap().items():
        a = DecomposingRecordingPen(go); go[name].draw(a); b = DecomposingRecordingPen(gn); gn[new.getBestCmap()[cp]].draw(b)
        assert a.value == b.value and go[name].width == gn[new.getBestCmap()[cp]].width, (w, name)
print('existing glyphs unchanged; size', len(open(out, 'rb').read()))

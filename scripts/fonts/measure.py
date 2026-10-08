# Outline measurements for add-lira.py: H stem width and O hairline along scanlines (nonzero winding).
from fontTools.pens.basePen import BasePen
class Flat(BasePen):
    def __init__(s, gs): super().__init__(gs); s.polys=[]; s.cur=[]
    def _moveTo(s,p): s.cur=[p]
    def _lineTo(s,p): s.cur.append(p)
    def _qCurveToOne(s,p1,p2):
        p0=s.cur[-1]
        for i in range(1,9):
            t=i/8; s.cur.append(((1-t)**2*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0], (1-t)**2*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1]))
    def _curveToOne(s,p1,p2,p3):
        p0=s.cur[-1]
        for i in range(1,9):
            t=i/8; u=1-t; s.cur.append((u**3*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t**3*p3[0], u**3*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t**3*p3[1]))
    def _closePath(s): s.polys.append(s.cur); s.cur=[]
    _endPath=_closePath
def poly(gs,g):
    f=Flat(gs); gs[g].draw(f); return f.polys
def runs(polys, horiz, c):
    # nonzero-winding ink intervals along line y=c (horiz) or x=c
    xs=[]
    for P in polys:
        for i in range(len(P)):
            a=P[i]; b=P[(i+1)%len(P)]
            if not horiz: a=(a[1],a[0]); b=(b[1],b[0])
            if (a[1]<=c<b[1]) or (b[1]<=c<a[1]):
                x=a[0]+(c-a[1])*(b[0]-a[0])/(b[1]-a[1]); xs.append((x, 1 if b[1]>a[1] else -1))
    xs.sort(); w=0; out=[]; start=None
    for x,d in xs:
        nw=w+d
        if w==0 and nw!=0: start=x
        if w!=0 and nw==0: out.append((start,x))
        w=nw
    return out
def m(font, loc):
    gs=font.getGlyphSet(location=loc)
    H=poly(gs,'H'); cap=max(p[1] for P in H for p in P)
    stem=runs(H,True,cap*0.3)[0]; stem=stem[1]-stem[0]
    O=poly(gs,'O'); xs=[p[0] for P in O for p in P]; ys=[p[1] for P in O for p in P]
    oth=runs(O,False,(min(xs)+max(xs))/2)[0]; oth=oth[1]-oth[0]
    return dict(cap=cap, Hw=gs['H'].width, stem=stem, Othin=oth)

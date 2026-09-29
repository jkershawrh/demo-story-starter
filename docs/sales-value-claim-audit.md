# Sales-entry value-claim audit

Audit date: 2026-09-28

This review separates presentation copy from VEF claims. It does not certify a
lab, approve a financial model, establish ROI, or create GTM attribution.

## Reviewed entries

| Experience | Immutable source revision | Finding |
| --- | --- | --- |
| Red Hat × Intel AI Strategy | `jkershawrh/red-hat-intel-ai-strategy@ca818094ad1f2c3f84df969848487495cd02cd73` | Explicitly separates experience telemetry, VEF evidence, and GTM attribution. No numerical value or performance claim is enabled. |
| Governed Agentic AI | `jkershawrh/governed-agentic-ai-sales@1431a9b54321c68c488bf24fdf6e861f73c87f6b` | Uses qualitative governance and journey language. It does not claim certification, ROI, or customer outcome. |
| Sovereign AI | `jkershawrh/sovereign-ai-sales@ec6a8ece5437b51a695aea285dae0c4a11b6f1fe` | Synthetic identity and reference-value behavior remain labeled rehearsal. No live TDX, performance, or financial claim is enabled. |
| Virtualization + AI | `jkershawrh/virtualization-ai-sales@7d8054b1e964627f40768fb182cba26c9d868c4e` | Uses qualitative modernization claims and visibly bounded evidence state. No numerical value or performance claim is enabled. |

All four repositories were clean at the reviewed revisions. Their shared
configuration validator warns on static metric, statistic, scale, and numerical
comparison scenes; quantitative runtime proof must come from a live adapter and
retain its source state.

## Result

No current sales entry contains a numerical business-value claim that needs to
be grandfathered into VEF. No benchmark assumption is approved for sales use.
Future cost, risk, operational-value, or ROI numbers must arrive as a claim that
passes the pinned `vef.claim.v1alpha2` contract and remains separate from GTM
attribution.

## Open portfolio gap

The roadmap names **AI on Intel Xeon** as a distinct sales play for model fit,
placement, latency, capacity, and economics, but there is no separate immutable
sales-entry repository for it yet. The deeper CPU Inference 101 and Agentic 201
paths exist; the missing item is the short business-facing entry experience
that qualifies a buyer into those labs without copying benchmark numbers into
static presentation content.

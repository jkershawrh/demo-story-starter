# Sales-entry value-claim audit

Audit date: 2026-09-28

This review separates presentation copy from VEF claims. It does not certify a
lab, approve a financial model, establish ROI, or create GTM attribution.

## Reviewed entries

| Experience | Immutable source revision | Finding |
| --- | --- | --- |
| Red Hat × Intel AI Strategy | `jkershawrh/red-hat-intel-ai-strategy@ca818094ad1f2c3f84df969848487495cd02cd73` | Explicitly separates experience telemetry, VEF evidence, and GTM attribution. No numerical value or performance claim is enabled. |
| AI on Intel Xeon | `jkershawrh/intel-xeon-ai-sales@96804fb7717f3ef65c64501437b7cc57752251bc` | Uses live or visibly labeled rehearsal task evidence and explicitly separates CPU capability from observed hardware placement. No static performance, capacity, cost, or ROI claim is enabled. |
| Governed Agentic AI | `jkershawrh/governed-agentic-ai-sales@1431a9b54321c68c488bf24fdf6e861f73c87f6b` | Uses qualitative governance and journey language. It does not claim certification, ROI, or customer outcome. |
| Sovereign AI | `jkershawrh/sovereign-ai-sales@ec6a8ece5437b51a695aea285dae0c4a11b6f1fe` | Synthetic identity and reference-value behavior remain labeled rehearsal. No live TDX, performance, or financial claim is enabled. |
| Virtualization + AI | `jkershawrh/virtualization-ai-sales@7d8054b1e964627f40768fb182cba26c9d868c4e` | Uses qualitative modernization claims and visibly bounded evidence state. No numerical value or performance claim is enabled. |

All five repositories were clean at the reviewed revisions. Their shared
configuration validator warns on static metric, statistic, scale, and numerical
comparison scenes; quantitative runtime proof must come from a live adapter and
retain its source state.

## Result

No current sales entry contains a numerical business-value claim that needs to
be grandfathered into VEF. No benchmark assumption is approved for sales use.
Future cost, risk, operational-value, or ROI numbers must arrive as a claim that
passes the pinned `vef.claim.v1alpha2` contract and remains separate from GTM
attribution.

## Closed portfolio gap

**AI on Intel Xeon** now has a separate immutable sales-entry repository for
task fit, model identity, request measurement, and hardware-evidence strength.
It routes into the existing CPU Inference 101 and Agentic 201 paths without
copying benchmark or economic numbers into static presentation content.

# TA guide

One page: check a whole batch of sealed submissions at once. Time: a few minutes for a full section, most of it unzipping.

## The five steps

1. On the Canvas assignment page, choose **Download Submissions**. Canvas gives you one zip of every student's file.
2. Unzip it.
3. Open **knobe.org/studio** and choose the **Cohort check** tab.
4. Load the journey file (or the assignment spec) under *What should these chain to?* This sets the expectation: submissions should link to that file's fingerprint.
5. Drag the unzipped folder onto the drop zone. Every readable file is verified on the spot, in your browser. Nothing is uploaded.

## Reading the table

One row per file. Problem rows sort to the top.

- **Integrity**: `verified` means the file is byte-identical to what the student sealed. `failed` means it was altered after sealing. `unreadable` means it is not a sealed file at all (often a plain essay uploaded without sealing).
- **Chain**: `linked` means the file references the assigned spec or journey by exact hash. `no link` means it chains to something else, or to nothing.
- **AI disclosure**: the student's own declaration of what an AI did, quoted from the file. `none declared` is not an anomaly by itself; under a disclosure policy it means the student declared no AI use.
- **Review**: the submission status the student sealed, usually `submitted`.

A `failed` or `no link` row is a conversation, not a verdict. The table tells you what the file says about itself; what that means is course policy.

## Exporting and grading

**Download the table as CSV** gives you the same rows for gradebook cross-reference. The CSV contains only what students declared inside their files; no Canvas data enters the page. Grading itself stays in SpeedGrader, where a sealed file displays as plain text.

## One student's history

Drop a single student's files from across the term and press **Chain view**. Each file lists what it builds on and whether the fingerprints match, which is the record you want in a regrade or integrity conversation.

## If you run an AI agent

The same checks run agentically: install `knobe-mcp` (see knobe.org/mcp) in Claude Desktop or any MCP client, point it at the unzipped folder, and ask it to verify the batch and tabulate declarations. It runs locally, so the privacy posture is unchanged.

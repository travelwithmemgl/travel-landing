# Where the image work stands

**Next step: connect to the Higgsfield MCP and generate.** Everything else is done.

## Decided

- The site's photographs are being replaced with generated images (B + C: new
  imagery, plus decorative assets). The owner chose this knowing the trade — the
  pictures stop being photographs of places the trips actually visit.
- **`hero.jpg` and `cta.jpg` stay photographs.** The API tops out at 1080p, and a
  generated hero would be 1620×1080 against the 1920×1280 it replaced — a visible
  drop on the one image that fills the screen.
- `avatar-1/2/3.jpg` are exported from `data.ts` and rendered by nothing. Delete
  them rather than generate them.

## Built

- `plan.json` — 53 slots: prompt, aspect ratio, resolution, and the page slot each
  one fills. Aspect ratios match how the page renders them, which also fixes the
  insets: they are `aspect-square` in `experiences.tsx` but their files were
  700×210 to 700×525, so `exp-fishing-inset` was losing about 70% of itself.
- `generate.mjs` — `npm run images`, with `--dry-run`, `--only`, `--force`. Skips
  what is already on disk, so a re-run after a failure pays only for the failures.

## The attribution, recovered

Nothing linked a local file to its credit — `photoCredits` is keyed by Commons
filename. The link for the two kept photographs was found and is recorded under
`keptPhotographs` in `plan.json`:

| | Author | Licence |
| --- | --- | --- |
| `hero.jpg` | Marcin Konsek | CC BY-SA 4.0 — attribution required |
| `cta.jpg` | Bernard Gagnon | CC0 |

**`photoCredits` must not be cut until the 53 files are actually replaced.** The
photographs are on the page until then, and CC BY-SA requires the credit that is
there. When they are replaced, the list becomes exactly those two entries.

## Two wallets, one of them empty

The REST API (`api.higgsfield.ai`) bills a balance that is **$0.00** — it returns
`403 not_enough_credits`, and the key in `~/.higgsfield.env` is good, that is not
the problem. The Max Plan's **1,627 credits** live on the consumer side and the
API cannot spend them. The MCP server (`https://mcp.higgsfield.ai/mcp`, registered
at user scope) is the way to reach those credits.

## On connecting

1. Check what the MCP exposes — models, aspect ratios, resolutions. The published
   OpenAPI spec was already wrong about the REST API (it advertises 21:9 and
   2K/4K; the service takes neither), so read the tools rather than trust a doc.
   If the MCP's options differ, `plan.json` follows them.
2. Generate one image. Look at it, and watch the credit count: 1,627 against 53
   images is the question nobody can answer until one has been spent.
3. Then the rest, the file swap, the credits, and the design work that the new
   imagery makes possible.

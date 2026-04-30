# TODO: Fix Double Scrollbar & Footer Visibility

## Steps:
- [x] Step 1: Clean up src/index.css - consolidate html/body/#root rules, add proper single scrollbar (overflow-y: auto on body), ensure no excess height.
- [x] Step 2: Clean up src/App.css - remove duplicate global rules (html/body/#root), keep only component styles.
- [x] Step 3: Verify layout - single scrollbar on body, #root flex pushes footer to bottom, no extra space/margins/padding after footer.
- [x] Step 4: Test with `npm run dev` - confirm on short/long content, no double scroll, footer exact bottom.
- [ ] Step 5: Complete task.



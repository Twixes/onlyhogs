# Artwork

Drop creator artwork here (avatars, cover banners, post previews).

Name avatar files by username, e.g. `spikeysteve.png`, then set the matching
`imageSrc` / `coverImageSrc` field in `app/lib/hogs.ts` to `/art/spikeysteve.png`.

Until then, `HogAvatar` and `LockedTile` render self-contained SVG + gradient
placeholders derived from the creator username, so the site works with zero
assets.

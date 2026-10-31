# vision

rig is what stays up when the reader isn't. It does three things and should stay that small:

1. **beat**: prove it's alive, once a minute, to a file anyone can read.
2. **show**: one board with the lane's state, readable in under a minute.
3. **digest**: turn the night's run log into something a slow reader reads at breakfast.

Not a scheduler, not a dashboard product, not a place for secrets. If a feature needs a
database, it belongs somewhere else.

Readers are slow on purpose. Every page should survive being read slowly: no animation, no
truncation, nothing that only makes sense live.

# Benqi veQi subgraph

### Commands:

generate types:

- `npx graph codegen --output-dir build/types/`
  build code:
- `npx graph build`
  deploy:
- `npx graph deploy --debug --access-token $THEGRAPH_TOKEN osadeh/benqi-qi-dev --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/`

### Guides

- Deploying sub-graphs to Moonriver [https://docs.moonbeam.network/builders/integrations/indexers/thegraph/]
- Reference (Compound V2) [https://github.com/compound-finance/compound-v2-subgraph]
- Partial Benqi graph (Compound V2):
  - [https://github.com/ChaosLabsInc/benqi-subgraph-partial]
  - [https://github.com/token-terminal/tt-subgraphs/tree/main/benqi/v1-avalanche]
- Contract addresses [https://docs.moonwell.fi/moonwell-finance/protocol-info/contracts]

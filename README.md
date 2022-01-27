# ERC20 Token Bridge

This is a set of smart contracts that can be deployed on different evm compatible chains to bridge ERC20 tokens and native currencies between chains. Native currencies and ERC20 tokens on their mainchain will be deposited into an ERC20 wrapper contract and then minted on the chain to be bridged.
At the moment this is a centralized version. That means that a central server (in this cas a Moralis server) is listening to the deposit events of the different smart contracts and then minting or burning the corresponding token. A short demo video can be found here:

https://drive.google.com/file/d/1LdS3FPAUpRWGsSqBf7VAJiX2wA2QXvsy/view?usp=sharing
// define the same export types as used by export typechain/ethers
import {BigNumberish} from 'ethers'
import { BytesLike } from '@ethersproject/bytes'

export type Address = string

export function addr(add: String): Address { return add }

export function uint256(num: bigint): BigNumberish { return num }
export function uint(num: bigint): BigNumberish { return num }
export function uint48(num: bigint): BigNumberish { return num }

export function bytes(num: BytesLike): BytesLike { return num }
export function bytes32(num: BytesLike): BytesLike { return num }

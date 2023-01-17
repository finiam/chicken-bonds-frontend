import { formatEther } from 'ethers/lib/utils';
import { uint256 } from 'starknet';

export default function parseUint256(val: any) {
	return Number(formatEther(uint256.uint256ToBN(val).toString()));
}

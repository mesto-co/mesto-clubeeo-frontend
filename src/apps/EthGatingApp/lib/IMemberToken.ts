export interface IMemberToken {
  id: number,
  amount: number,
  contractAddress: string,
  tokenId: string,
  walletAddress: string,
  chain: string,
  walletId: number,
  memberId: number,
  userId: number,
  clubId: number,
  data: Record<string, string>
  metadata: {
    image_url?: string,
    image_url_cdn?: string,
  } & Record<string, string>
  changedAt: string,
  checkedAt: string,
  createdAt: string,
  updatedAt: string,
}

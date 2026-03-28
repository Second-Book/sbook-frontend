import apiClient from "./api";

const WishlistService = {
  getWishlist() {
    return apiClient.get("/api/wishlist/");
  },
  addToWishlist(textbookId: number) {
    return apiClient.post(`/api/wishlist/${textbookId}/`);
  },
  removeFromWishlist(textbookId: number) {
    return apiClient.delete(`/api/wishlist/${textbookId}/`);
  },
  checkWishlist(textbookId: number) {
    return apiClient.get(`/api/wishlist/${textbookId}/check/`);
  },
};

export default WishlistService;

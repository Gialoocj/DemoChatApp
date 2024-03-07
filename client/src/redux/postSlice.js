import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [], // Khởi tạo mảng chứa các bài viết
    error: null, // Khởi tạo biến để lưu trữ lỗi (nếu có)
    loading: false, // Khởi tạo biến để theo dõi trạng thái loading
  },
  reducers: {
    addPost: (state, action) => {
      // Thêm bài viết mới vào mảng posts
      state.posts.push(action.payload);
    },
    postError: (state, action) => {
      // Lưu trữ lỗi nếu có
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      // Thiết lập trạng thái loading
      state.loading = action.payload;
    },
  },
});

// Export các action creators từ slice
export const { addPost, postError, setLoading } = postSlice.actions;

// Export reducer từ slice
export default postSlice.reducer;

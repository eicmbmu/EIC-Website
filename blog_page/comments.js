function toggleComments(button, event) {
    // Prevent the click from navigating to the blog post
    event.preventDefault();
    event.stopPropagation();
    
    // Find or create comment section
    let commentSection = button.parentElement.nextElementSibling;
    if (!commentSection || !commentSection.classList.contains('comment-box')) {
        commentSection = createCommentSection();
        button.parentElement.after(commentSection);
    }
    
    // Toggle visibility
    commentSection.classList.toggle('hidden');
}

function createCommentSection() {
    const section = document.createElement('div');
    section.className = 'comment-box bg-gray-50 p-4 rounded-lg mt-4 hidden';
    section.innerHTML = `
        <div class="flex flex-col gap-3">
            <textarea 
                class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="Write your comment..."
                rows="3"
            ></textarea>
            <div class="flex justify-end">
                <button 
                    onclick="postComment(this, event)"
                    class="post-comment-btn px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Post
                </button>
            </div>
        </div>
        <div class="comments-list mt-4 space-y-3">
            <!-- Comments will appear here -->
        </div>
    `;
    return section;
}

function postComment(button, event) {
    event.preventDefault();
    event.stopPropagation();
    
    const commentBox = button.closest('.comment-box');
    const textarea = commentBox.querySelector('textarea');
    const commentsList = commentBox.querySelector('.comments-list');
    const commentText = textarea.value.trim();
    
    if (!commentText) return;
    
    // Create new comment
    const comment = document.createElement('div');
    comment.className = 'comment-item bg-white p-3 rounded-lg shadow-sm';
    comment.innerHTML = `
        <div class="flex justify-between items-start">
            <div class="text-gray-700">${commentText}</div>
            <div class="text-xs text-gray-500">${new Date().toLocaleString()}</div>
        </div>
    `;
    
    // Add comment to list
    commentsList.insertBefore(comment, commentsList.firstChild);
    
    // Clear textarea
    textarea.value = '';
}
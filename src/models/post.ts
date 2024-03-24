class Post {
    body: string;
    category: string;
    title: string;
    createdAt: Date;

    constructor(body: string, category: string, title: string) {
        this.body = body;
        this.category = category;
        this.title = title;
        this.createdAt = new Date();
    }
}

export default Post;
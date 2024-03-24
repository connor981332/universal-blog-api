interface jsonPayload {
    body: string;
    category: string;
    title: string;
}

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

    static fromJson(json: jsonPayload): Post {
        if (!json.body || typeof json.body !== 'string') {
            throw new Error("Expected property 'body' of type 'string'");
        }
        if (!json.category || typeof json.body !== 'string') {
            throw new Error("Expected property 'category' of type 'string'");
        }
        if (!json.title || typeof json.body !== 'string') {
            throw new Error("Expected property 'title' of type 'string'");
        }
        return new Post(json.body, json.category, json.title);
    }
}

export default Post;
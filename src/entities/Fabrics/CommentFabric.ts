import { Comment } from "../Comments";

export class CommentFabric {
    public static create(
        id?: string,
        id_room?: string,
        id_user?: string,
        comment?: string,
        created_at?: Date
    ): Comment {
        return new Comment(
            id,
            id_room || "default_room",
            id_user || "default_user",
            comment || "default comment",
            created_at || new Date()
        );
    }

}

export class CommentDTO {
    public id?: string;
    public id_room?: string;
    public id_user?: string;
    public comment?: string;
    public created_at?: string; // Fecha como string para simplificar transporte

    constructor(
        id?: string,
        id_room?: string,
        id_user?: string,
        comment?: string,
        created_at?: string
    ) {
        this.id = id;
        this.id_room = id_room;
        this.id_user = id_user;
        this.comment = comment;
        this.created_at = created_at;
    }

    /**
     * json example
     * {
     *  "id": "id",
     *  "id_room": "id_room",
     *  "id_user": "id_user",
     *  "comment": "comment",
     *  "created_at": "created_at"
     * }
     */
}

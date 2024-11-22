
export class Comment {

	private id?: string;
	private id_room?: string;
	private id_user?: string;
	private comment?: string;
	private created_at?: Date;

	constructor(id?: string, id_room?: string, id_user?: string, comment?: string, created_at?: Date) {
		this.id = id;
		this.id_room = id_room;
		this.id_user = id_user;
		this.comment = comment;
		this.created_at = created_at;
	}

	public getId(): string | undefined {
		return this.id;
	}
	public setId(id: string): void {
		this.id = id;
	}
	public getId_room(): string | undefined {
		return this.id_room;
	}
	public setId_room(id_room: string): void {
		this.id_room = id_room;
	}
	public getId_user(): string | undefined {
		return this.id_user;
	}
	public setId_user(id_user: string): void {
		this.id_user = id_user;
	}
	public getComment(): string | undefined {
		return this.comment;
	}
	public setComment(comment: string): void {
		this.comment = comment;
	}
	public getCreated_at(): Date | undefined {
		return this.created_at;
	}
	public setCreated_at(created_at: Date): void {
		this.created_at = created_at;
	}

}

import { Comment } from "../Comments";
import { CommentDTO } from "../DTO/CommentsDTO";
import { CommentFabric } from "../Fabrics/CommentFabric";

export class CommentMapper {
    // Convierte un Comment a CommentDTO
    public static toDTO(comment: Comment): CommentDTO {
        return new CommentDTO(
            comment.getId(),
            comment.getId_room(),
            comment.getId_user(),
            comment.getComment(),
            comment.getCreated_at()?.toISOString()
        );
    }

    // Convierte un CommentDTO a Comment
    public static toEntity(dto: CommentDTO): Comment {
        return CommentFabric.create(
            dto.id,
            dto.id_room,
            dto.id_user,
            dto.comment,
            dto.created_at ? new Date(dto.created_at) : undefined
        );
    }
    
}

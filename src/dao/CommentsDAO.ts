import { config } from "dotenv";
import { Comment } from "../entities/Comments";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from "firebase/firestore";
import { FirebaseService } from "../service/firebaseDB";
import { createDebugger } from "../utils/debugConfig";
import { DaoResponse, ErrorControl } from "../constants/ErrorControl";
import { HttpStatusCode } from "axios";
import { CommentDTO } from "../entities/DTO/CommentsDTO";
import { CommentMapper } from "../entities/Mappers/CommentMapper";
import { getDateTime } from "../utils/Time";

config();

// Logger config
const log = createDebugger("CommentsDAO");
const logError = log.extend("error");

// Firebase service instance
const firebaseService = FirebaseService.getInstance();
const db = firebaseService.getFirestoreInstance();

export class CommentsDAO {
	public static readonly COLLECTION = "comments";

	private static getDataToSave(comment: Comment): any {
		return {
			id_room: comment.getId_room(),
			id_user: comment.getId_user(),
			comment: comment.getComment(),
			created_at: getDateTime(),
		};
	}

	// Add a new comment
	protected static async add(data: CommentDTO): Promise<DaoResponse> {
		try {
			const commentToSave: Comment = CommentMapper.toEntity(data);
			// Save comment
			console.log(this.getDataToSave(commentToSave));
			const docRef = await addDoc(
				collection(db, CommentsDAO.COLLECTION),
				this.getDataToSave(commentToSave)
			);
			log("Comment added with ID: %s", docRef.id);
			return [ErrorControl.SUCCESS, docRef.id, HttpStatusCode.Created];
		} catch (error) {
			const msg = "Error adding comment";
			logError(msg + ": " + error);
			return [
				ErrorControl.ERROR,
				msg,
				HttpStatusCode.InternalServerError,
			];
		}
	}

	// Get a comment by ID
	protected static async getById(id: string): Promise<DaoResponse> {
		try {
			const docRef = doc(db, CommentsDAO.COLLECTION, id);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				return [
					ErrorControl.PERSONALIZED,
					"Comment not found",
					HttpStatusCode.NotFound,
				];
			}

			const comment = CommentMapper.toEntity({
				...docSnap.data(),
				id: docSnap.id,
			} as CommentDTO);

			return [ErrorControl.SUCCESS, comment, HttpStatusCode.Ok];
		} catch (error) {
			const msg = "Error getting comment";
			logError(msg + ": " + error);
			return [
				ErrorControl.ERROR,
				msg,
				HttpStatusCode.InternalServerError,
			];
		}
	}

	// Update a comment
	protected static async update(
		data: CommentDTO,
		id: string
	): Promise<DaoResponse> {
		try {
			const docRef = doc(db, CommentsDAO.COLLECTION, id);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				return [
					ErrorControl.PERSONALIZED,
					"Comment not found",
					HttpStatusCode.NotFound,
				];
			}

			const updatedData: Comment = CommentMapper.toEntity(data);
			await updateDoc(docRef, { ...this.getDataToSave(updatedData) });

			return [ErrorControl.SUCCESS, "Comment updated", HttpStatusCode.Ok];
		} catch (error) {
			const msg = "Error updating comment";
			logError(msg + ": " + error);
			return [
				ErrorControl.ERROR,
				msg,
				HttpStatusCode.InternalServerError,
			];
		}
	}

	// Delete a comment
	protected static async delete(id: string): Promise<DaoResponse> {
		try {
			const docRef = doc(db, CommentsDAO.COLLECTION, id);
			await deleteDoc(docRef);
			return [ErrorControl.SUCCESS, "Comment deleted", HttpStatusCode.Ok];
		} catch (error) {
			const msg = "Error deleting comment";
			logError(msg + ": " + error);
			return [
				ErrorControl.ERROR,
				msg,
				HttpStatusCode.InternalServerError,
			];
		}
	}
}

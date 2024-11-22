import { Request, Response, Router } from "express";
import { ErrorControl } from "../constants/ErrorControl";
import { CheckCache } from "../middlewares/Cache";
import { verifyToken } from "../middlewares/jwt";
import { CommentsDAO } from "../dao/CommentsDAO";


export class CommentsController extends CommentsDAO {
	private router: Router;

	constructor() {
		super();
		this.router = Router();
	}

	public routes(): Router {

		// add
		this.router.post(
			"/",
			async (req: Request, res: Response) => {
				const comment = req.body.comment;
				const data = await CommentsDAO.add(comment);
				if (data[0] == ErrorControl.SUCCESS) {
					return res
						.status(data[2])
						.send("User created successfully: " + data[1]);
				}
				return res.status(data[2]).send(data[1]);
			}
		);

		// get by id
		this.router.get(
			"/:id",
			verifyToken,
			CheckCache,
			async (req: Request, res: Response) => {
				const id = req.params.id;
				const data = await CommentsDAO.getById(id);
				return res.status(data[2]).send(data[1]);
			}
		);

		// update
		this.router.put(
			"/:id",
			verifyToken,
			async (req: Request, res: Response) => {
				const id = req.params.id;
				const comment = req.body.comment;
				const data = await CommentsDAO.update(comment, id);
				return res.status(data[2]).send(data[1]);
			}
		);

		// delete
		this.router.delete(
			"/:id",
			verifyToken,
			async (req: Request, res: Response) => {
				const id = req.params.id;
				const data = await CommentsDAO.delete(id);
				return res.status(data[2]).send(data[1]);
			}
		);

		return this.router;
	}
}

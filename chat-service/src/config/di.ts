// for the dependency injection container

// importing the required modules
import { ConversationRepository } from "../infrastructure/repository/ConversationRepository";
import { ConversationController } from "../presentation/controller/ConversationController";
import { ConversationUseCase } from "../application/use-cases/ConversationUseCase";

const convoRepo = new ConversationRepository();
const convoUseCase = new ConversationUseCase(convoRepo);
export const convoController = new ConversationController(convoUseCase);

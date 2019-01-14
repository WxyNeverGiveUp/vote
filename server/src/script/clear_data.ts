import { VoteHandler } from "./../models/voteHandler";

async function clear() {
    const voteHandler = new VoteHandler()
    await voteHandler.del_negative_run_counter()
    await voteHandler.del_negative_vote_counter() 
    await voteHandler.del_positive_run_counter() 
    await voteHandler.del_positive_vote_counter() 
    console.log('[done]strange talk data clear done!')
    return
}

clear()
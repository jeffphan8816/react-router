import {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from "../../hooks/use-http";
import {getAllComments} from "../../lib/api";
import CommentsList from "./CommentsList";
import LoadingSpinner from "../UI/LoadingSpinner";


const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);

    const {sendRequest, status, data} = useHttp(getAllComments);
    const {id} = useParams();
    useEffect(() => {
        sendRequest(id);
    }, [sendRequest, id]);
    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    const addedCommentHandler = useCallback(
        () => {
            sendRequest(id);
        }, [sendRequest, id]);


    let comments = null;
    if (status === 'pending') {
        comments = (
            <div className={'centered'}>
                <LoadingSpinner/>
            </div>
        )
    }
    if (status === 'completed' && (data && data.length > 0)) {
        comments = <CommentsList comments={data}/>
    }
    if (status === 'completed' && (!data || data.length === 0)) {
        comments = <p className={'centered focused'}>No comments found!</p>
    }
    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && <NewCommentForm postId={id} onAddedComment={addedCommentHandler}/>}
            {comments}
        </section>
    );
};

export default Comments;

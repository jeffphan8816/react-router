import {Route, useParams} from "react-router";
import {Fragment, useEffect} from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import {Link, useRouteMatch} from "react-router-dom";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";


const QuoteDetails = () => {
    const {id} = useParams();
    const routematch = useRouteMatch();
    const {status, data, error, sendRequest} = useHttp(getSingleQuote, true);
    useEffect(() => {
        sendRequest(id);
    }, [sendRequest, id]);

    if (status === 'pending') {
        return (
            <div className={'centered'}>
                <LoadingSpinner/>
            </div>
        )
    }
    if (error) {
        return <p className={'centered focused'}>{error}</p>
    }

    if (!data.text) {
        return (
            <NoQuotesFound/>
        )
    }

    return (
        <Fragment>
            <HighlightedQuote text={data.text} author={data.author}/>
            <Route exact path={`${routematch.path}`}>
                <div className={'centered'}>
                    <Link className={'btn--flat'} to={`${routematch.url}/comments`}>Load Comments</Link>
                </div>
            </Route>

            <Route path={`${routematch.path}/comments`}>
                <Comments/>
            </Route>
        </Fragment>
    );
};

export default QuoteDetails;

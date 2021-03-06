import { useState, useEffect } from 'react';
import { useParams, Prompt } from 'react-router-dom';

import classes from './CreateAndUpdateBook.module.css';

import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import { VALIDATOR_REQUIRE } from '../../../util/validators';
import useForm from '../../../hooks/form-hook';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';

const BookEdit = props => {
    const [book, setBook] = useState(null);
    const [isEntering, setIsEntering] = useState(false);

    const bookId = useParams().bookId;

    useEffect(() => {
        (async () => {
            const book = await getDoc(doc(db, 'books', bookId));
            setBook({
                id: book.id,
                ...book.data()
            });
        })();
    }, [bookId]);

    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: true
        },
        author: {
            value: '',
            isValid: true
        },
        imageUrl: {
            value: '',
            isValid: true
        },
        genre: {
            value: '',
            isValid: true
        },
        price: {
            value: '',
            isValid: true
        },
        publisher: {
            value: '',
            isValid: true
        },
        year: {
            value: '',
            isValid: true
        },
        pages: {
            value: '',
            isValid: true
        },
        condition: {
            value: '',
            isValid: true
        },
        covers: {
            value: '',
            isValid: true
        },
        contacts: {
            value: '',
            isValid: true
        }
    }, true);

    const submitHandler = event => {
        event.preventDefault();

        let modifiedData = {};
        for (const input in formState.inputs) {
            modifiedData[input] = formState.inputs[input].value;
        }
        modifiedData.id = book.id;

        props.onModifyData(modifiedData);
    };

    const focusHandler = () => {
        setIsEntering(true);
    };

    return (
        <>
            <Prompt
                when={isEntering}
                message={() => 'Are you sure that you want to leave? All your changes and entered data can be lost!'
                }
            />
            {!book && <LoadingSpinner className={classes.loading} />}
            {book &&
                <Card className={classes.container}>
                    <h1>Edit Book Info</h1>
                    <form className={classes.form} onSubmit={submitHandler} onFocus={focusHandler}>
                        <div className={classes['book-info']}>
                            <Input
                                id="title"
                                type="text"
                                label="Title"
                                element="input"
                                isValid={true}
                                value={book.title}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorMessage={'Please enter a valid title.'}
                                onInput={inputHandler}
                            />
                            <Input
                                id="author"
                                type="text"
                                label="Author"
                                element="input"
                                isValid={true}
                                value={book.author}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorMessage={'Please enter a valid author.'}
                                onInput={inputHandler}
                            />
                            <Input
                                id="imageUrl"
                                type="text"
                                label="ImageUrl"
                                element="input"
                                isValid={true}
                                value={book.imageUrl}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorMessage={'Please enter a valid imageUrl.'}
                                onInput={inputHandler}
                            />
                            <Input
                                id="genre"
                                type="text"
                                label="Genre"
                                element="input"
                                isValid={true}
                                value={book.genre}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorMessage={'Please enter a valid genre.'}
                                onInput={inputHandler}
                            />
                            <Input
                                id="price"
                                type="number"
                                label="price"
                                element="input"
                                isValid={true}
                                value={book.price}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorMessage={'Please enter a valid price.'}
                                onInput={inputHandler}
                            />
                        </div>
                        <div className={classes['book-publisher']}>
                            <Input
                                id="publisher"
                                type="text"
                                label="Publisher"
                                element="input"
                                isValid={true}
                                value={book.publisher}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorMessage={'Please enter a valid publisher.'}
                                onInput={inputHandler}
                            />
                            <div className={classes.inline}>
                                <Input
                                    id="year"
                                    type="number"
                                    label="Year"
                                    element="input"
                                    isValid={true}
                                    value={book.year}
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorMessage={'Please enter a valid year.'}
                                    onInput={inputHandler}
                                />
                                <Input
                                    id="pages"
                                    type="number"
                                    label="Pages"
                                    element="input"
                                    isValid={true}
                                    value={book.pages}
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorMessage={'Please enter a valid pages.'}
                                    onInput={inputHandler}
                                />
                            </div>
                            <div className={classes.inline}>
                                <Input
                                    id="condition"
                                    label="Condition"
                                    element="select"
                                    options={
                                        <>
                                            <option></option>
                                            <option value="Excellent">Excellent</option>
                                            <option value="Very Good">Very Good</option>
                                            <option value="Good">Good</option>
                                            <option value="Bad">Bad</option>
                                            <option value="Very Bad">Very Bad</option>
                                        </>
                                    }
                                    isValid={true}
                                    value={book.condition}
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorMessage={'Please enter a valid state.'}
                                    onInput={inputHandler}
                                />
                                <Input
                                    id="covers"
                                    label="Covers"
                                    element="select"
                                    options={
                                        <>
                                            <option></option>
                                            <option value="Soft">Soft</option>
                                            <option value="Hard">Hard</option>
                                        </>
                                    }
                                    isValid={true}
                                    value={book.covers}
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorMessage={'Please enter a valid covers.'}
                                    onInput={inputHandler}
                                />
                            </div>
                            <Input
                                id="contacts"
                                type="text"
                                label="Contacts"
                                element="input"
                                isValid={true}
                                value={book.contacts}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorMessage={'Please enter a valid contacts.'}
                                onInput={inputHandler}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={!formState.isValid}
                            className={classes['edit-btn']}
                        >
                            Edit
                        </Button>
                    </form>
                </Card >
            }
        </>
    );
};

export default BookEdit;
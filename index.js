/*create a state to maintain an array of objects representing the bookmarks
add functions for getBookmarks and setBookmarks

the bookmark array will look like this: 
[{name: "name", link: "link"}, etc]
*/


//===================================
//#region State Management
//===================================

/**
 * Function to manage state
 * @param  {} //takes in initial bookmark list (as default, the bookmark list will start empty)
 * @return {[function, function]} //getBookmarks and setBookmarks functions
 */
const useState = (initial = []) => {
    //create the closure
    let bookmarks = initial;
    return [
        () => bookmarks, //getBookmarks
        (update) => (bookmarks = update) //setBookmarks
    ]
}



/**
 * Function to manage state by adding a bookmark
 * @param  {string, string} //takes in the name and link for the book mark
 * @return {array} //returns a new bookmark array
 */
const addBookmark = (bookmarks, bmName, bmLink) => {
    //creates a bookmark object

    const bookmark = {name: bmName, link: bmLink};
    bookmarks.push(bookmark);

    //returns the whole array of bookmarks
    return bookmarks;
}

/**
 * Function to manage state by removing a bookmark
 * @param  {array} //takes in an array of bookmarks
 * @param {object} //takes in a bookmark object
 * @return {array} //returns a new bookmark array
 */
const removeBookmark = (bookmarks, bm) => {
    //find the index of the bookmark
    const idx = bookmarks.indexOf(bm);

    //if the bookmark exists, delete it and return that new bookmark array
    //otherwise, return the original array
    return idx !== -1
    ? bookmarks.slice(0, idx).concat(bookmarks.slice(idx + 1))
    : bookmarks;
}


//===================================
//#region Rendering
//===================================


/**
 * Function to create bookmark element
 * @param  {object} //takes in bookmark object
 * @return {html element} //returns bookmark element
 */
const renderBookmark = (bookmark) => {
    //create full element
    const el = document.createElement('td');
    el.classList += 'bookmark';

    //create link
    const a = document.createElement('a');
    a.textContent = bookmark.name;
    a.href = bookmark.link;
    a.classList += 'link'

    //create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList += 'remove';

    removeBtn.addEventListener('click', () => {
        //create an updated list of bookmarks
        const updatedBm = removeBookmark(getBookmarks(), bookmark);

        //update the state
        setBookmarks(updatedBm);

        //re-render the whole app
        renderApp(getBookmarks());
    });

    el.append(removeBtn, a);

    return el;
}

/**
 * Function to create bookmark element
 * @param  {array} //takes in bookmark array
 * @return {array} //returns array of bookmark html elements 
 */
const renderBookmarkList = (bookmarks) => {
    //create element to hold the books
    const ul = document.createElement('tr');

    //create array of rendered bookmarks
    const renderedBm = bookmarks.map(renderBookmark);

    //add class
    ul.classList += 'bookmark_list';

    //add the bookmarks to the ul
    ul.replaceChildren(...renderedBm);

    //return the full element
    return ul;
}

/**
 * Function to render all elements
 * @param  {array} //takes in bookshelf
 * @return {void} //returns nothing
 */
const renderApp = (bookmarks) => {
    //get the main element
    const table = document.querySelector('table');

    //clear the element
    table.replaceChildren();

    //get a rendered bookshelf ul element
    const renderedBm = renderBookmarkList(bookmarks);

    //replace the children in the main
    table.replaceChildren(renderedBm);

    //return nothing
}

//===================================
//#region Event Listeners
//===================================

const submitBtn = document.querySelector('.submit');

submitBtn.addEventListener('click', (e) => {
    //stop refresh
    e.preventDefault(); 

    //get the name and link
    const [bmName, bmLink] = document.querySelector('form').children;
    
    
    //create a new bookmark array with the added bookmark, change the state to that new array

    const bookmarks = getBookmarks();
    const updatedBookmarks = addBookmark(bookmarks, bmName.value, bmLink.value);
    setBookmarks(updatedBookmarks);

    //re-render the whole thing
    renderApp(getBookmarks());

    //clear the form
    document.querySelector('form').reset();
});

//===================================
//#region Initialization
//===================================


//create the bookshelf and get the corresponding functions
const [getBookmarks, setBookmarks] = useState();
//render
renderApp(getBookmarks());
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import card_logo from './Images/LOGO.png';
import { MdDelete } from 'react-icons/md';
import { deleteGroup, } from '../../Redux/Actions/Index';

const MyFlashCards = () => {

  const flashCard = useSelector((state) => state.flashcardReducers.cards);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ShowCards, setShowCards] = useState(6);

  const ShowMore = () => {
    setShowCards(flashCard.length);
  }

  const ShowLess = () => {
    setShowCards(6);
  }

  return (
    <>
      {/* when length of card will be zero show a message => No Flashcards Available. if length of card 1 or more then it will show the cards */}

      {flashCard.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-[80vh]'>
          <div className='text-red-600 m-2 font-bold' >
            No Flashcards available!
          </div>

          <Link to='/'>
            <button className='rounded-xl hover:bg-red-800 bg-red-700 px-4 p-2 m-2 text-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium  py-2.5 mr-2 mb-2 '>
              Create Flashcards
            </button>
          </Link>
        </div>) : (null)
      }


      <div className='flex flex-wrap space-evenly sm:px-8 md:px-8 lg:px-8 xl:px-8 px-2 '>
         {/* here all the cards will be shown  */}
          {/* we are using slice method for show cards if number of cards is more then 6 it will show only 6 cards until we click on the Show all button */}
        {
          flashCard.slice(0, ShowCards).map((elem) => {
            return (
              <div className=" m-2 flex dark:text-blue-400 hover:scale-110 overflow-hidden justify-center pt-12 drop-shadow-md" key={elem.id} >

                <img className="w-16 h-16 border-[1px] border-black absolute top-4  rounded-full shadow-lg" src={elem.uploadimage === null ? (card_logo) : (elem.uploadimage)} alt="Image_logo" />

                {/*delete button for cards*/}

                <div className="bg-white border dark:bg-gray-700 px-4 w-[250px] xl:w-[300px] sm:w-[300px] lg:w-[300px] md:w-[300px] h-64  pt-11 pb-2 rounded-lg dark:border-gray-500 ">
                  <MdDelete onClick={() => dispatch(deleteGroup(elem.id))} className='text-3xl absolute top-14 right-2 text-red-600' />
                  <div className="flex flex-col items-center">
                    <h5 className="mb-2 text-xl font-medium  ">{elem.Create_Group}</h5>
                    <div className=" my-2 h-12 overflow-hidden text-center text-wrap">{elem.description}</div>
                    <span className="font-bold my-2"> {Object.keys(elem.term).length} Cards</span>
                    {/* when we click on button (View Cards) it will navigate to particular group detail's card on the basis of card id    */}
                    <button onClick={() => navigate(`/flashcardsdetails/${elem.id}`)} className="inline-flex mt-1 items-center px-8 sm:px-12 md:px-12 lg:px-12 xl:px-12 py-2 text-center max-w-xs  dark:border-red-500  bg-white rounded-full hover:bg-red-100 font-bold  text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800  text-lg mr-2 mb-2">
                      View Cards
                    </button>
                  </div>
                </div>
              </div>
            )
          }
          )
        }



      </div>
      {/* checking length of card and useing ternary operator to show buttons (Show More,Show Less) if 6 cards is available it's show the See all button */}
      {flashCard.length > 6 ? (
        <div className="flex justify-end mr-10">
        {/* if cards length will be more then 6 it will show button (ShowLess) otherwise ShowMore */}
          {
            ShowCards === flashCard.length ?
              <button onClick={ShowLess} className="mb-24 font-bold  cursor-pointer w-24 mx-5 text-red-700">  See less</button>
              : <button onClick={ShowMore} className="mb-24 font-bold  cursor-pointer w-24 mx-5 text-red-700">  See all</button>
          }
        </div>
      ) : (null)}
    </>
  )
}

export default MyFlashCards

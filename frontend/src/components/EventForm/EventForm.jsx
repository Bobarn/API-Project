import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { thunkGetSpecificGroup } from '../../store/groups';
import { thunkCreateEvent, thunkCreateEventImage } from '../../store/events';

const EventForm = ({ event, formType }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(event?.price);
  const [name, setName] = useState(event?.name);
  const [description, setDescription] = useState(event?.description);
  const [privateBoolean, setPrivateBoolean] = useState(event?.private);
  const [type, setType] = useState(event?.type);
  const [image, setImage] = useState(event?.image);
  const [startDate, setStartDate] = useState(event?.startDate);
  const [endDate, setEndDate] = useState(event?.endDate);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch();

  const { groupId } = useParams();

//   const group = useSelector((state) => state.groups[groupId]);

//   useEffect(() => {
//     dispatch(thunkGetSpecificGroup(groupId))
//   }, [dispatch])


  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    event = {name, capacity: 100, description, private: privateBoolean, type, venueId: 1, price: Number(price), startDate, endDate };

    console.log('Here is the event we send over', event);

    if(Object.values(errors).length) {
      event.errors = errors;
    }

    if(formType === 'Create Event' && !event.errors) {

      event = await dispatch(thunkCreateEvent(event, groupId));

      await dispatch(thunkCreateEventImage(event?.id, image))

    }
    // else if(formType === 'Update Event' && !event.errors){

    //   event = await dispatch(thunkUpdateEvent(event, eventId));

    //   await dispatch(thunkCreateEventImage(image, eventId));

    // }
    else {

      return null;

    }

    if(event.errors) {

      setErrors(event.errors);
      console.log('Here are all the errors', errors);

    } else {

      navigate(`/events/${event.id}`);

    }
  };

  useEffect(() => {
    const newErrors = {};

    if(!type) {
        newErrors.type = 'Event Type is required';
    }
    if(privateBoolean === '') {
        newErrors.private = 'Visibility is required';
    }
    if(!image?.endsWith('.png') && !image?.endsWith('.PNG') && !image?.endsWith('.jpg') && !image?.endsWith('.JPG') && !image?.endsWith('.jpeg') && !image?.endsWith('.JPEG')) {
        newErrors.image = 'Image URL must end in .png, .jpg, or .jpeg';
    }
    if(description?.length < 30) {
        newErrors.description = 'Description must be at least 30 characters long';
    }
    if(!name) {
        newErrors.name = 'Name is required';
    }
    if(!price){
        newErrors.price = 'Price is required';
    }
    if(!startDate) {
        newErrors.startDate = 'Event start is required'
    }
    if(!endDate) {
        newErrors.endDate = 'Event end is required'
    }

    setErrors(newErrors);
  }, [submitted, type, privateBoolean, image, description, name, price, startDate, endDate])

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div>
        <h2>What will your event&#39;s name be?</h2>
        {submitted && <div className="errors">{errors.name}</div>}
        <label>
            <textarea
            placeholder='Event name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </label>
      </div>
      <div>
      <div className={"selector type"}>
           {submitted && <div className="errors">{errors.type}</div>}
            <h5>Is this an in person or online event?</h5>
            <label>
                <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                >
                    <option value={'In person'}>In person</option>
                    <option value={'Online'}>Online</option>
                    <option value={''} disabled>&#40;select one&#41;</option>
                </select>
            </label>
        </div>
        <div className={"selector private"}>
            {submitted && <div className="errors">{errors.private}</div>}
            <h5>Is this event private or public?</h5>
            <label>
                <select
                value={privateBoolean}
                onChange={(event) => setPrivateBoolean(event.target.value)}
                placeholder='(select one)'
                >
                    <option value={true}>Private</option>
                    <option value={false}>Public</option>
                    <option value={''} disabled>&#40;select one&#41;</option>
                </select>
            </label>
        </div>
        <div>
        <h5>What is the price of your event?</h5>
        {submitted && <div className="errors">{errors.price}</div>}
        <div>
        <label>
        <input
        type="number"
        min="0.00"
        step="0.50"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />
        </label>
        </div>
      </div>
      </div>
      <div>
        <h5>When does your event start?</h5>
        <label htmlFor="start">
        <input
        type="datetime-local"
        id="start"
        name="startDate"
        value={startDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setStartDate(e.target.value)}
        />
        </label>
        <h5>When does your event end?</h5>
        <label htmlFor="start">
        <input
        type="datetime-local"
        id="start"
        name="endDate"
        value={endDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => {
            setEndDate(e.target.value)
        console.log(endDate)}}
        />
        </label>
      </div>
      <div>
        <h5>Please add an image url for your event below:</h5>
        {submitted && <div className="errors">{errors.image}</div>}
        <label>
            <textarea
            placeholder='Image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            />
        </label>
      </div>
      <div>
        <h5>Please describe your event:</h5>
        {submitted && <div className="errors">{errors.description}</div>}
        <label>
            <textarea
            placeholder='Please include at least 30 characters'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </label>
        </div>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default EventForm;
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllGroups, selectGroupsArray } from '../../store/groups';
import { useEffect } from 'react';
import GroupListItem from '../GroupsListItem/GroupsListItem';

export default function GroupsList() {

    const groups = useSelector(selectGroupsArray);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllGroups());
    }, [dispatch]);

    return (
        <section>
            <h5>Groups in Meetup</h5>
            <ul>
                {groups.map((group) => (
                    <GroupListItem
                        group={group}
                        key={group.id}
                    />
                ))}
            </ul>
        </section>
    )
}

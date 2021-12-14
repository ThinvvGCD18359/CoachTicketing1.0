import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from '../../../../api/userApi';
import ProfilePage from '../../components/profilePage';

function Profile(props) {
    const [user, setUser] = useState([]);
    const currentUserId = useSelector(state => state.user.current.id);

    useEffect(() => {
        const getUserData = async () => {
            if (!currentUserId) return
            try {
                const response = await userApi.getUserData({ currentUserId });
                setUser(response);
            } catch (error) {
                console.log(error);
            }
        }
        getUserData();
    }, [currentUserId]);

    const updateProfile = (response) => {
        setUser({...user, ...response});
    };
    return (
        <ProfilePage user={user} updateProfile={updateProfile}/>
    );
}

export default Profile;
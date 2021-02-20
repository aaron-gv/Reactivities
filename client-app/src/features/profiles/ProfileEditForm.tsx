import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Button, Tab } from 'semantic-ui-react';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Profile } from '../../app/models/profile';
import * as Yup from 'yup';
import { store } from '../../app/stores/store';
import LoadingComponent from '../../app/layout/LoadingComponent';

interface Props {
    profile: Profile,
    username: string,
    editMode: boolean,
    setEditMode(arg: boolean): any,
    isCurrentUser: boolean,
    loading:boolean
}

export default observer(function ProfileEditForm({profile, username, editMode, setEditMode, isCurrentUser, loading} : Props) {
    
    const validationSchema = Yup.object({
        displayName: Yup.string().required('Display name is required')
    })

    function handleProfileSubmit(dname : string,  dbio: any) {
        var newData : Partial <Profile> = {
            displayName: dname,
            bio: dbio,
            username: username
        }
    
        store.profileStore.updateProfile(newData);
        setEditMode(!editMode);
    }

    if (loading) return <Fragment><Tab.Pane><LoadingComponent content='Loading profile...' /></Tab.Pane></Fragment>;
    return (
        
        <Fragment>

        {isCurrentUser && editMode &&  profile &&
         
            <Formik
                initialValues={{
                    displayName: profile.displayName ,
                    bio: profile.bio
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleProfileSubmit(values.displayName, values.bio)}
            >
                {({handleSubmit, isSubmitting, isValid, dirty}) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'> 
                <MyTextInput name='displayName' placeholder='DisplayName'  />
                <MyTextArea rows={12} name='bio' placeholder='Bio' />
                <Button
                    disabled={!isValid || !dirty || isSubmitting || loading}
                    type='submit'
                    name='submit'
                    content='Send'
                />
                <Button disabled={ isSubmitting || loading} type='button' content='Cancel' onClick={() => setEditMode(!editMode)} />
            </Form>)}
        </Formik>
        }


    </Fragment>

    )
})
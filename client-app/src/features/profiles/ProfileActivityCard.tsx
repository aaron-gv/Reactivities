import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { UserActivity } from '../../app/models/profile';

interface Props{
    activity: UserActivity;
}

export default function ProfileActivityCard({activity} : Props) {
    var date = new Date(activity.date.toString());
    return (
        <Card key={activity.id} style={{}} as={Link} to={`http://localhost:3000/activities/${activity.id}`}>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Header style={{color:"black", fontWeight: "bold"}} textAlign="center">
                {activity.title}
            </Card.Header>
            <Card.Meta textAlign="center">
                {format(date, 'dd MMM yyyy')}
                <br />
                {format(date, 'hh:mm')}
            </Card.Meta>
        </Card>
    )
}
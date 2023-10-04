// import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';

const ProfileCard = (props) => {
  return (
    // <Card className="w-96">
    //   <CardHeader floated={false} className="h-80 flex items-center justify-center">
    //     <img
    //       src={props.avatar ? props.avatar : '/assets/img/default.svg'}
    //       alt={props.username}
    //       className="flex-1"
    //     />
    //   </CardHeader>
    //   <CardBody className="text-center">
    //     <Typography variant="h4" color="blue-gray">
    //       {props.username}
    //     </Typography>
    //   </CardBody>
    // </Card>
    <div className="flex flex-col">
      <img
        src={props.avatar ? props.avatar : '/assets/img/default-avatar.svg'}
        alt={props.username}
        className="flex-1"
      />
      <div>{props.username}</div>
    </div>
  );
};

export default ProfileCard;

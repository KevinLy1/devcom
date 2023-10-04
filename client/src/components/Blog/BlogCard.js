import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar
} from '@material-tailwind/react';

const BlogCard = (props) => {
  return (
    <Card className="max-w-[24rem] overflow-hidden flex flex-col">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-64">
        <img
          src={props.image ? props.image : '/assets/img/default-publication.svg'}
          alt={props.title}
          className="object-cover w-full h-full"
        />
      </CardHeader>

      <CardBody className="bg-gray-50 dark:bg-slate-950 flex-1 text-blue-gray-900 dark:text-white">
        <Link to={`/${props.type}/${props.idPublication}`}>
          <Typography variant="h4">{props.title}</Typography>
        </Link>
        <Typography variant="lead" className="mt-3 font-normal">
          {props.description}
        </Typography>

        {/* <div className="flex justify-between items-center mt-3">
          <div>
            <span className="text-gray-500">Nombre de commentaires : {props.commentCount}</span>
          </div>
          <div>
            <span className="text-gray-500">Réputation : {props.reputation}</span>
          </div>
        </div> */}
      </CardBody>

      <CardFooter className="flex items-center justify-between bg-gray-50 dark:bg-slate-950">
        <Link to={`/user/${props.idUser}`} className="flex items-center gap-2">
          <Avatar
            size="sm"
            variant="circular"
            alt={props.author}
            src={props.authorAvatar ? props.authorAvatar : '/assets/img/default-avatar.svg'}
          />
          <span className="dark:text-white">{props.author}</span>
        </Link>
        <Typography className="font-normal">{props.dateCreation}</Typography>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;

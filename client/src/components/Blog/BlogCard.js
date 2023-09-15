import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar
} from '@material-tailwind/react';

export function BlogCard(props) {
  return (
    <Card className="max-w-[24rem] overflow-hidden flex flex-col">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-64">
        {props.image ? (
          <img src={props.image} alt={props.title} className="object-cover w-full h-full" />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="ui/ux review check"
            className="object-cover w-full h-full"
          />
        )}
      </CardHeader>
      <CardBody className="bg-gray-50 dark:bg-slate-950 flex-1">
        <Link to={`/${props.type}/${props.idPublication}`}>
          <Typography variant="h4">{props.title}</Typography>
        </Link>
        <Typography variant="lead" className="mt-3 font-normal dark:text-white">
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
          {props.authorAvatar && (
            <Avatar size="sm" variant="circular" alt={props.author} src={props.authorAvatar} />
          )}
          <span className="dark:text-white">{props.author}</span>
        </Link>
        <Typography className="font-normal">{props.dateCreation}</Typography>
      </CardFooter>
    </Card>
  );
}

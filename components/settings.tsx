import axios from 'axios';
import { createRef } from 'react';

const Settings = (props: any) => {
	const renameRef = createRef<HTMLInputElement>();

	return (
		<div className="z-50 absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80">
			<div className="w-1/2 my-32 m-auto bg-gray-800 rounded-lg">
				<div className="mr-4 flex">
					<div className="w-full" />
					<button
						className=""
						onClick={() => {
							props.closeSettings();
						}}
					>
						X
					</button>
				</div>
				{props.shownSettings.map((item: string, index: number) => {
					switch (item) {
						case 'usrBan':
							return (
								<div className="m-4 h-8 flex">
									<h1 className="cursor-default w-1/3">Ban user</h1>
									<div className="w-1/3" />
									<button
										className="rounded-lg hover:bg-blue-500 hover:bg-opacity-75 transition-all ease-in-out duration-100 w-1/3"
										onClick={() => {
											axios
												.put(
													`https://api.dailies.tk/user/${props.router.query.id}`,
													{ banned: !props.userdata.banned },
													{ withCredentials: true }
												)
												.then(() => {
													props.router.reload();
												});
										}}
									>
										<p className="text-center">
											{props.userdata.banned ? 'Unban' : 'Ban'}
										</p>
									</button>
								</div>
							);

						case 'usrDelete':
							return (
								<div className="m-4 h-8 flex">
									<h1 className="cursor-default w-1/3">Delete user</h1>
									<div className="w-1/3" />
									<button
										className="rounded-lg hover:bg-blue-500 hover:bg-opacity-75 transition-all ease-in-out duration-100 w-1/3"
										onClick={() => {
											axios
												.put(
													`https://api.dailies.tk/user/${props.router.query.id}`,
													{ banned: !props.userdata.banned },
													{ withCredentials: true }
												)
												.then(() => {
													props.router.reload();
												});
										}}
									>
										<p className="text-center">Delete</p>
									</button>
								</div>
							);

						case 'usrRename':
							return (
								<div className="m-4 h-8 flex">
									<h1 className="cursor-default w-1/3">Username: </h1>
									<div className="w-1/3">
										<input
											ref={renameRef}
											type="text"
											defaultValue={props.userdata.username}
										/>
									</div>
									<button
										className="rounded-lg hover:bg-blue-500 hover:bg-opacity-75 transition-all ease-in-out duration-100 w-1/3"
										onClick={() => {
											if (renameRef.current?.value !== '') {
												axios
													.put(
														`https://api.dailies.tk/user/${props.router.query.id}`,
														{ username: renameRef.current?.value },
														{ withCredentials: true }
													)
													.then(() => {
														props.router.reload();
													});
											}
										}}
									>
										Submit
									</button>
								</div>
							);

						case 'colDelete':
							return (
								<div className="m-4 h-8 flex">
									<h1 className="cursor-default w-1/3">Delete collection</h1>
									<div className="w-1/3" />
									<button
										className="max-w-xs rounded-lg hover:bg-blue-500 hover:bg-opacity-75 transition-all ease-in-out duration-100 w-1/3"
										onClick={() => {
											axios
												.delete(
													`https://api.dailies.tk/collection/${props.router.query.id}`,
													{ withCredentials: true }
												)
												.then(() => {
													props.router.reload();
												});
										}}
									>
										Delete
									</button>
								</div>
							);

						case 'colUnpublish':
							return (
								<div className="m-4 h-8 flex">
									<h1 className="cursor-default w-1/3">Published</h1>
									<div className="w-1/3" />
									<button
										className="max-w-xs rounded-lg hover:bg-blue-500 hover:bg-opacity-75 transition-all ease-in-out duration-100 w-1/3"
										onClick={() => {
											axios
												.put(
													`https://api.dailies.tk/collection/${props.router.query.id}`,
													{ published: !props.colData.published },
													{ withCredentials: true }
												)
												.then(() => {
													props.router.reload();
												});
										}}
									>
										{props.colData.published ? 'Make public' : 'Make private'}
									</button>
								</div>
							);

						default:
							return <h1>No settings available</h1>;
					}
				})}
				<br />
			</div>
		</div>
	);
};

export default Settings;

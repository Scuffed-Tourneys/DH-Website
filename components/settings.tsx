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
						case 'ban':
							return (
								<div className="m-4 flex">
									<h1 className="w-full cursor-default">Ban user</h1>
									<div className="w-full" />
									<button
										className="w-full max-w-xs"
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
										{props.userdata.banned ? 'Unban' : 'Ban'}
									</button>
								</div>
							);

						case 'delete':
							return (
								<div className="m-4 flex">
									<h1 className="w-full cursor-default">Delete user</h1>
									<div className="w-full" />
									<button
										className="w-full max-w-xs"
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
										Delete
									</button>
								</div>
							);

						case 'rename':
							return (
								<div className="m-4 flex">
									<h1 className="w-full cursor-default">Username: </h1>
									<div className="w-1/2" />
									<input
										ref={renameRef}
										className=""
										type="text"
										defaultValue={props.userdata.username}
									/>
									<button
										className="w-full"
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

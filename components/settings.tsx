import axios from 'axios';

const Settings = (props: any) => {
	return (
		<div className="z-50 absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80">
			<div className="w-1/2 my-32 m-auto bg-gray-800 rounded-lg">
				<div className="mr-4 flex">
					<div className="w-full" />
					half the shit aint working yet so it is best you do not click anything
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
										className="w-full"
										onClick={() => {
											axios
												.put(
													`https://api.dailies.tk/user/${props.router.query.id}`,
													{ banned: !props.banned },
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

						case 'delete':
							return (
								<div className="m-4 flex">
									<h1 className="w-full cursor-default">Delete user</h1>
									<div className="w-full" />
									<button
										className="w-full"
										onClick={() => {
											axios
												.put(
													`https://api.dailies.tk/user/${props.router.query.id}`,
													{ banned: !props.banned },
													{ withCredentials: true }
												)
												.then(() => {
													props.router.reload();
												});
										}}
									>
										{props.banned ? 'Unban' : 'Ban'}
									</button>
								</div>
							);

						case 'rename':
							return (
								<div className="m-4 flex">
									<h1 className="w-full cursor-default">Username: </h1>
									<div className="w-full" />
									<input className="" type="text" />
									<button
										className="w-full"
										onClick={() => {
											axios
												.put(
													`https://api.dailies.tk/user/${props.router.query.id}`,
													{ username: 'man' },
													{ withCredentials: true }
												)
												.then(() => {
													props.router.reload();
												});
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

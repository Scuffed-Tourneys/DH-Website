import type { NextPage } from 'next';
import Head from 'next/head';
import { createRef, useState } from 'react';
import axios from 'axios';
import router from 'next/router';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then((r) => r.json());

const Upload: NextPage = (props: any) => {
	const [files, setSelectedFiles] = useState<FileList>();
	const [spinnerActive, setSpinnerActive] = useState<boolean>(false);

	const nameInput = createRef<HTMLInputElement>();
	const publicInput = createRef<HTMLInputElement>();
	const imagesInput = createRef<HTMLInputElement>();

	const { data, error } = useSWR('https://api.dailies.tk/', fetcher);
	if (!data) return <h1>loading</h1>;
	if (error) return <h1>error</h1>;

	function upload(files: FileList) {
		setSpinnerActive(true);
		fetch('https://api.dailies.tk/collection/new', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				name: nameInput.current!.value,
				timestamp: Date.now(),
				published: publicInput.current!.value == 'on' ? true : false,
			}),
		})
			.then((res) => {
				res.json()
					.then((r) => {
						for (let i = 0; i < files.length; i++) {
							const formData = new FormData();
							let file = files.item(i);
							if (file != null) {
								formData.append('file', file);
								axios
									.post(
										`https://api.dailies.tk/collection/${r.id}/image`,
										formData,
										{
											headers: { 'content-type': 'multipart/form-data' },
											withCredentials: true,
										}
									)
									.catch((e) => {
										alert(e);
									});
							}
						}
						router.push('/');
					})
					.catch((e) => {
						alert(e);
					});
			})
			.catch((e) => {
				alert(e);
			});
		/*
		axios
			.post(
				'https://api.dailies.tk/collection/new',
				{
					name: nameInput.current!.value,
					timestamp: Date.now(),
					published: publicInput.current!.value == 'on' ? true : false,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				for (let i = 0; i < files.length; i++) {
					const formData = new FormData();
					let file = files.item(i);
					if (file != null) {
						formData.append('file', file);
						axios
							.post(
								`https://api.dailies.tk/collection/${res.data.id}/image`,
								formData,
								{
									headers: { 'content-type': 'multipart/form-data' },
									withCredentials: true,
								}
							)
							.catch((e) => {
								alert(e);
							});
					}
				}
				router.push('/');
			})
			.catch((e) => {
				alert(e);
			});
			*/
	}

	if (Object.keys(data).length === 0) {
		router.push(`https://api.dailies.tk/login/discord?url=${router.asPath}`);
		return <></>;
	} else {
		return (
			<div className="my-auto h-full">
				<Head>
					<title>Dailies</title>
					<meta content="Dailies" property="og:title" />
					<meta content="website" property="og:type" />
					<meta content="Upload images" property="og:description" />
					<meta content="https://dailies.tk/upload" property="og:url" />
					{/* <meta content={props.data[0].images[0].url} property="og:image" /> */}
					<meta content="#2f3136" data-react-helmet="true" name="theme-color" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<section className="w-1/2 mx-auto my-16 h-max">
						<form className="grid gap-2">
							<label htmlFor="name">Collection name: </label>
							<input ref={nameInput} type="text" id="name" required />
							<div>
								<label htmlFor="public">Public: </label>
								<input ref={publicInput} type="checkbox" id="public" required />
							</div>
							<label htmlFor="images">Select images: </label>
							<input
								className="input"
								ref={imagesInput}
								type="file"
								id="images"
								name="images"
								accept="image/*, video/mp4"
								onChange={(e) => {
									if (e.target.files != null) {
										setSelectedFiles(e.target.files);
									}
								}}
								multiple
								required
							/>
							<hr />
							<button
								className="w-fit border-2 border-white border-opacity-25 rounded-md px-2 py-1 hover:border-blue-600 focus:enabled:bg-blue-600 focus:border-transparent transition-all duration-100 ease-in-out"
								type="button"
								onClick={() => {
									let validationSuccess = [
										nameInput.current?.reportValidity(),
										imagesInput.current?.reportValidity(),
									];
									console.log(validationSuccess);
									if (!validationSuccess.includes(false) && files != undefined) {
										upload(files);
									}
								}}
							>
								{spinnerActive ? 'Uploading...' : 'Upload'}
							</button>
						</form>
					</section>
				</main>
			</div>
		);
	}
};

export default Upload;

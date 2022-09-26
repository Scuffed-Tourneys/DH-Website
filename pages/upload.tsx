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
	const imagesInput = createRef<HTMLInputElement>();

	const { data, error } = useSWR('https://api.dailies.tk/', fetcher);
	if (!data) return <h1>loading</h1>;
	if (error) return <h1>error</h1>;

	function upload(files: FileList) {
		setSpinnerActive(true);
		for (let i = 0; i < files.length; i++) {
			const formData = new FormData();
			let file = files.item(i);
			if (file != null) {
				formData.append('file', file);
				axios.post('https://api.dailies.tk/collection/add/351', formData, {
					headers: { 'content-type': 'multipart/form-data' },
				});
			}
		}
		router.push('/');
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

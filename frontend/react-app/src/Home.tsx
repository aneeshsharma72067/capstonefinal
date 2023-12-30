import { useEffect, useState } from 'react';

const apiKey = '1851a2b719msh9472d1897640ac4p1f4735jsn52b98592e5d9';
const apiHost = 'easy-instagram-service.p.rapidapi.com';
const myBackendUrl = 'http://localhost:5000';
const Home = () => {
	const [instaUsername, setInstaUsername] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [instaData, setInstaData] = useState(null);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(instaUsername);

		setIsLoading(true);
		const url =
			'https://easy-instagram-service.p.rapidapi.com/username-with-base64-image?username=' +
			instaUsername;
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': apiKey,
				'X-RapidAPI-Host': apiHost,
			},
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			console.log(result);
			setInstaData(result);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const handleCreateAccount = async() => {
		console.log({ instaData });
		setIsLoading(true);

		const url = '/api/signup';
		const payload = {
			// imgBase64: instaData.profile_pic_base64_image,
			imgBase64:'some',
			fullName: instaData.full_name,
			username: instaData.username,
			password: password,
			email:email
		};

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			// mode:'no-cors',
			body: JSON.stringify(payload),
		});
		const jsonRes = await response.json();
		setIsLoading(false);
		if (jsonRes.success === true) {
			alert('Your account is created successfully, you can login in now');
		} else {
			alert('Account creation failed, please try again');
		}
	};
	useEffect(() => {
		// const makeApiCall = async () => {
		// 	const url =
		// 		'https://easy-instagram-service.p.rapidapi.com/username-with-base64-image?username=maroon5';
		// 	const options = {
		// 		method: 'GET',
		// 		headers: {
		// 			'X-RapidAPI-Key': apiKey,
		// 			'X-RapidAPI-Host': apiHost,
		// 		},
		// 	};
		// 	try {
		// 		const response = await fetch(url, options);
		// 		const result = await response.text();
		// 		console.log(result);
		// 	} catch (error) {
		// 		console.error(error);
		// 	}
		// };
		// makeApiCall();
	}, []);
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Search your insta profile'
					onChange={(event) => setInstaUsername(event.target.value)}
				/>
				<button>{isLoading ? 'Please wait...' : 'Submit'}</button>
			</form>

			{instaData && (
				<div className='user-insta-info'>
					<img
						src={instaData.profile_pic_base64_image}
						alt='instal profile img'
						className='profile-img'
					/>
					<div>
						<p className='insta-fullname'>{instaData.full_name}</p>
						<p className='insta-username'>{instaData.username}</p>
					</div>
					<div>
						<label htmlFor='user-password'>Enter your Password</label>
						<input
							type='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='user-email'>Enter your Email</label>
						<input
							type='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					
					<button onClick={handleCreateAccount}>
						{isLoading
							? 'Creating Account...'
							: 'Create Your Account with Insta Data'}
					</button>
				</div>
			)}
		</div>
	);
};

export default Home;

/*

{
    "id": "43296293",
    "full_name": "Heather🌸",
    "biography": "BLACK LIVES MATTER                                       “I CAN NOT BE BOUGHT. I CAN NOT BE PERSUADED”\nGraduate 🎓\n\"I think therefore, I AM!\"",
    "username": "heathersmallwood_",
    "is_private": true,
    "external_url": "",
    "is_verified": false,
    "profile_pic_url": "https://instagram.fphx1-2.fna.fbcdn.net/v/t51.2885-19/235218454_917144712564015_4149618327427883951_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fphx1-2.fna.fbcdn.net&_nc_cat=103&_nc_ohc=dKFLkwE71xwAX_VVuu4&edm=AKEQFekBAAAA&ccb=7-5&oh=00_AfAIOYWTBAxvPVLPUmNV1D17goqbvukismijZkJCGwMcoA&oe=6593338A&_nc_sid=29ddf3",
    "profile_pic_base64_image": "data:image/jpeg;base64,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",
    "stored_profile_pic_url": "",
    "following": 1242,
    "follower": 1232,
    "like": 0,
    "comment": 0,
    "video_view": 0,
    "total_post": 17,
    "average_like": 0,
    "average_comment": 0,
    "average_video_view": 0,
    "last_post": null,
    "igtv": [],
    "is_exist": ""
}

*/

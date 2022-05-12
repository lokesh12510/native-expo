import { GOOGLE_MAPS_API_KEY } from "../constants";

// get current address based on lat and lon
export const getAddress = async (lat, lon) => {
	try {
		// let [address] = await Location.reverseGeocodeAsync({
		//   latitude: lat,
		//   longitude: lon,
		// });
		// if (address) {
		//   console.log(address);
		//   let currentAddress = `${address.streetNumber}, ${address.street}, ${address.city}, ${address.region}, ${address.country}- ${address.postalCode}`;
		//   setSelectedAddress(currentAddress);
		//   return currentAddress;
		// }
		fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + lat + "," + lon + "&key=" + GOOGLE_MAPS_API_KEY)
			.then((response) => response.json())
			.then((responseJson) => {
				let address = responseJson?.results[0]?.formatted_address;
				console.log(address, "address");
				return address;
			});
	} catch (e) {
		console.log("errors:", e);
	}
};

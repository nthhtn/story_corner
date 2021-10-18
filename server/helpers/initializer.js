import Category from '../models/Category';

export async function generateCategories() {
	const categories = await Category.find({}).exec();
	if (categories.length > 0) { return; }
	const list = [
		{ name: 'review du lich', displayName: 'Du lịch' },
		{ name: 'review phim', displayName: 'Phim' },
		{ name: 'dich thuat bai hat', displayName: 'Bài hát' },
		{ name: 'dich thuat phim', displayName: 'Phim ' },
		{ name: 'dich thuat bai bao', displayName: 'Bài báo' },
		{ name: 'tan man', displayName: 'Tản mạn' }
	];
	const result = await Category.insertMany(list);
	console.log(result);
};

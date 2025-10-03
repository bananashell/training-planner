type Props = {
	name: string;
	description?: string;
	tags: string[];
	image?: {
		url?: string;
	};
};

export const ExcerciseCard = ({ name, image, description, tags }: Props) => {
	return (
		<article>
			{image && (
				<div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-white/5">
					<img
						src={image.url}
						alt={name}
						className="w-full h-full object-cover"
						onError={(e) => {
							e.currentTarget.style.display = "none";
						}}
					/>
				</div>
			)}
			<h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-200">
				{name}
			</h2>
			{description && (
				<p className="text-white/80 text-sm line-clamp-3 mb-3">{description}</p>
			)}
			{tags && tags.length > 0 && (
				<div className="flex flex-wrap gap-1">
					{tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-1 text-xs bg-blue-500/20 text-blue-200 rounded-full border border-blue-500/30"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</article>
	);
};

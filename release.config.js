module.exports = {
	branches: ['main'],
	repositoryUrl: 'git+https://github.com/Vinyl-Depository/Inflint',
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		'@semantic-release/npm',
		'@semantic-release/git',
		'@semantic-release/github',
	],
};
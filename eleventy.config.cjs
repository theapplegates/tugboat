const pluginWebc = require("@11ty/eleventy-plugin-webc");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { eleventyImagePlugin } = require("@11ty/eleventy-img");
const emojiShortName = require("emoji-short-name");

const pluginJavaScriptFrontMatter = require("./_config/javascriptFrontMatter.cjs");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginJavaScriptFrontMatter);

	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: {
			"tabindex": "0"
		}
	});

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./_components/**/*.webc",
			"npm:@11ty/eleventy-img/*.webc",
			"npm:@11ty/is-land/*.webc"
		]
	});

	eleventyConfig.addPlugin(eleventyImagePlugin, {
		formats: ["webp", "jpeg"],
		urlPath: "/img/",

		defaultAttributes: {
			loading: "lazy",
			decoding: "async"
		}
	});

	eleventyConfig.setServerOptions({
		domDiff: false
	});

	eleventyConfig.addJavaScriptFunction("emojiShortName", (emoji) => {
		return emojiShortName[emoji];
	})
};
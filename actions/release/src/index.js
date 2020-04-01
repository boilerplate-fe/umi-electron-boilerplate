const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {
    // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
    const github = new GitHub(process.env.GITHUB_TOKEN);

    // Get owner and repo from context of payload that triggered the action
    const { owner, repo } = context.repo;

    // Get the inputs from the workflow file: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    const tagName = core.getInput('tag_name', { required: true });
    console.log(tagName, 'tagName');
    const allowDuplicate = core.getInput('allow_duplicate', { required: false });
    console.log(allowDuplicate, 'allowDuplicate');

    // This removes the 'refs/tags' portion of the string, i.e. from 'refs/tags/v1.10.15' to 'v1.10.15'
    const tag = tagName.replace('refs/tags/', '');
    console.log(tag, 'tag');
    const releaseName = core.getInput('release_name', { required: true }).replace('refs/tags/', '');
    const body = core.getInput('body', { required: false });
    const draft = core.getInput('draft', { required: false }) === 'true';
    const prerelease = core.getInput('prerelease', { required: false }) === 'true';
    try {
      const releaseResponse = await github.repos.getReleaseByTag({
        owner,
        repo,
        tag,
      });
      if (releaseResponse.status === 200) {
        if (allowDuplicate) {
          console.log(
            'return',
            releaseResponse.data.id,
            releaseResponse.data.html_url,
            releaseResponse.data.upload_url
          );
          core.setOutput('id', String(releaseResponse.data.id));
          core.setOutput('html_url', releaseResponse.data.html_url);
          core.setOutput('upload_url', releaseResponse.data.upload_url);
          return;
        }
        core.setFailed('Duplicate tag');
      }
    } catch (error) {
      console.log('error', error);
    }
    console.log('return 2');
    const createReleaseResponse = await github.repos.createRelease({
      owner,
      repo,
      tag_name: tag,
      name: releaseName,
      body,
      draft,
      prerelease,
    });
    // Get the ID, html_url, and upload URL for the created Release from the response
    const {
      data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl },
    } = createReleaseResponse;
    // Set the output variables for use by other actions: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    core.setOutput('id', String(releaseId));
    core.setOutput('html_url', htmlUrl);
    core.setOutput('upload_url', uploadUrl);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

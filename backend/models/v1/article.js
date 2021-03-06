/**
 * @author jk
 * @version 1.0.0
 */

import $    from '../../utils';
import Base from '../base';

const Article = new Base('Article', {
  user:      { type: Base.ObjectId(), ref: 'User' },
  headerImg: String,
  title:     String,
  content:   String,
  status:    String,
  job:       {},
  sendAt:    { type: Date, default: Date.now },
  likes:     { type: Array, default: [] },
  _index:    { type: Number, default: 0, index: true }
});

const validateSchema = $.paramter.object().keys({
  title:     $.paramter.string(),
  user:      $.paramter.string(),
  content:   $.paramter.string(),
  subTitle:  $.paramter.string().empty(''),
  headerImg: $.paramter.string().empty(''),
  status:    $.paramter.string(),
  sendAt:    $.paramter.date().empty(''),
})
.with('title', 'content', 'user')
.without('headerImg', 'subTitle', 'sendAt'); // optional

Article.methods.create = async function (query) {
  const { error, value } = $.paramter.validate(query, validateSchema);
  $.debug(error);
  if (error) return -1;
  query._index = await this.count({}) + 1;
  return await Article.create(query);
}



export default Article.methods



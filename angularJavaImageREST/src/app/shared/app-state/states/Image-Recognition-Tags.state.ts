import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {ImageRecognitionTags} from "../actions/image.action";

export interface ImageRecognitionTagsStateModel {
  tags: Array<string>;
}


@State<ImageRecognitionTagsStateModel>( {
  name: 'recognizedTags',
  defaults: {
    tags: null
  }
} )
@Injectable()
export class ImageRecognitionTagsState {

  constructor() {  }

  @Selector()
  static getRecognizedTags(state: ImageRecognitionTagsStateModel): Array<string>
  { return state.tags; }

  @Action(ImageRecognitionTags)
  setImageTags(ctx: StateContext<ImageRecognitionTagsStateModel>,
               action: ImageRecognitionTags) {
    ctx.setState( { tags: action.imageTags } );
  }

}
